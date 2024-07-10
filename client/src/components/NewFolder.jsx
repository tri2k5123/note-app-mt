import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { useEffect, useState } from "react";
import { addNewFolder } from "../utils/folderUtils";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function NewFolder() {
    const [ newFolderName, setNewFolderName ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ searchParams, setSearchParams ] = useSearchParams();

    const popupName = searchParams.get('popup')

    const navigate = useNavigate();

    const handleOpenPopup = () => {
        setSearchParams({ popup: 'add-folder' })
    }

    const handleClose = () => {
        setNewFolderName('');
        navigate(-1)
    }
    
    const handleAddNewFolder = async () => {
        const { addFolder } = await addNewFolder({ name: newFolderName });
        handleClose()
    }

    useEffect(() => {
        if(popupName === 'add-folder') {
            setOpen(true);
            return;
        }
        setOpen(false);

    }, [popupName])

    return (
        <div>
            <Tooltip title='Add Folder' onClick={handleOpenPopup}>
                <IconButton size="small">
                    <CreateNewFolderOutlinedIcon sx={{ color: 'white' }}/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Folder</DialogTitle>
                <DialogContent>
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Folder name"
                        fullWidth
                        size="small"
                        variant="standard"
                        sx={{ width: '400px' }}
                        autoComplete="off"
                        value={newFolderName}
                        onChange={e => setNewFolderName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddNewFolder}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}