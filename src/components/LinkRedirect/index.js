import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import {app, firestore} from "../../firebase";
import { CircularProgress, Box, Typography } from "@material-ui/core";

const LinkRedirect = () => {
    const {shortCode} = useParams();
    const [loading, setLoading] = useState(true);
        
    useEffect(() => {
        const fetchLinkDoc = async () => {
            const linkDoc = await firestore.collection("links").doc(shortCode).get();
            if(linkDoc.exists){
                const {longURL, linkID, userUid} = linkDoc.data();
                firestore.collection('users').doc(userUid).collection('links').doc(linkID).update({
                    totalClicks: app.firestore.FieldValue.increment(1)
                });
                window.location.href = longURL;
            } else{
                setLoading(false);
            }
        };
        fetchLinkDoc();
    },[]);

    if(loading) return (
        <Box mt={10} textAlign="center">
            <CircularProgress /> 
            <Typography>Redirecting to the link</Typography>
        </Box>
    );
    else
        return(
            <Box mt={10} textAlign="center">
                <Typography>Link is invalid</Typography>
            </Box>
        );
};

export default LinkRedirect;
