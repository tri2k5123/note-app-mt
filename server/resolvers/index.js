import Folder from '../models/Folder.js';
import Author from '../models/Author.js';
import Note from '../models/Note.js';
import Notification from '../models/Notification.js';
import { GraphQLScalarType } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    }
  }),
  Query: {
    folders: async (parent, args, context) => {
      const folders = await Folder.find({
        authorId: context.uid
      }).sort({
        updatedAt: 'desc'
      });
      return folders;
    },
    folder: async (parent, args) => {
      const folder = await Folder.findById(args.folderId);
      return folder;
    },
    note: async (parent, args) => {
      const note = await Note.findById(args.noteId);
      return note;
    }
  },
  Folder: {
    author: async (parent, args) => await Author.findOne({ uid: parent.authorId }),
    notes: async (parent, args) => await Note.find({ folderId: parent.id }).sort({updatedAt: 'desc'})
  },
  Mutation: {
    addNote: async(parent, args) => {
      const newNote = new Note(args);
      await newNote.save();
      return newNote;
    },
    updateNote: async(parent, args) => {
      const noteId = args.id;
      const note = await Note.findByIdAndUpdate(noteId, args);
      return note;
    },
    addFolder: async (parent, args, context) => {
      const newFolder = new Folder({ ...args, authorId: context.uid });
      pubsub.publish('FOLDER_CREATED', {
        folderCreated: {
          message: 'A new folder created'
        }
      })
      await newFolder.save();
      return newFolder
    },
    register: async (parent, args, context) => {
      const foundedUser = await Author.findOne({ uid: args.uid });
      if(!foundedUser) {
        const newUser = new Author(args);
        await newUser.save();
        return newUser;
      };
      return foundedUser;
    },
    pushNotification: async (parent, args) => {
      const newNotification = new Notification(args);

      pubsub.publish('PUSH_NOTIFICATION', {
        notification: {
          message: args.content,
        }
      })
      
      await newNotification.save();
      return { message: 'SUCCESS' }
    }
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED', 'NOTE_CREATED'])
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION'])
    }
  }
};