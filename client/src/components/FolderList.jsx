import { Box, Card, CardContent, List, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";


// eslint-disable-next-line react/prop-types
export default function FolderList({ folders }) {
    const { folderId } = useParams(); 
    const [ activeFolderId, setActiveFolderId ] = useState(folderId);


    return (
        <List 
            sx={{ 
                width: '100%',
                bgcolor: '#7d9d9c',
                height: '100%',
                padding: '10px',
                textAlign: 'left',
                overflowY: 'auto'
            }}
            subheader={ 
                <Box  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                        Folder
                    </Typography>
                    <NewFolder/>
                </Box>
            }
        >
            {folders.map(({ id, name }) => (
                <Link
                    key={id}
                    to={`folders/${id}`}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setActiveFolderId(id)}
                >
                    <Card sx={{ mb: '5px', backgroundColor: id === activeFolderId ? "rgb(255 211 140)" : null }}>
                        <CardContent
                            sx={{ '&:last-child': { pb: '12px' },padding: '12px' }}>
                            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>{name}</Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </List>
    )
}