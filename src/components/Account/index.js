import { useState, Fragment, useEffect, useCallback, useMemo } from "react";
import { Button, Typography, Box, Grid, Divider, Snackbar } from "@material-ui/core";
import Navbar from "./Navbar";
import LinkCard from "./LinkCard";
import ShortenURLModal from "./ShortenURLModal";
import { app, firestore, auth } from "../../firebase";
import { nanoid } from "nanoid";
import copy from "copy-to-clipboard";


// const dummyData = [
//     {
//         id: '31rwe43fsdrfw',
//         createdAt: new Date(),
//         name: 'My website',
//         longURL: 'https://google.com',
//         shortCode: 'masdo',
//         totalClicks: 312
//     },
//     {
//         id: '31rwsdf56yhgfgd',
//         createdAt: new Date(),
//         name: 'E-book',
//         longURL: 'https://drive.google.com/asdfgase',
//         shortCode: 'ieifs',
//         totalClicks: 43
//     },
//     {
//         id: '123ioasdjfhpd',
//         createdAt: new Date(),
//         name: 'Buyer',
//         longURL: 'https://buyer.com/asdfncv',
//         shortCode: 'ieioks',
//         totalClicks: 21
//     },
// ]


const Account = () => {
        const [newLinkToastr, setNewLinkToastr] = useState(false);
        const [openModal, setOpenModal] = useState(false);
        const [links, setLinks] = useState([]);
        const userUid = auth.currentUser.uid;
        const linksPathRef = useMemo (() => firestore
        .collection('users')
        .doc(userUid)
        .collection('links'), [userUid]);

        const handleCreateShortenLink = async (name, longURL) => {
            const link = {
                name, 
                longURL,
                createdAt: app.firestore.FieldValue.serverTimestamp(),
                shortCode: nanoid(6),
                totalClicks: 0
            };

            const resp = await linksPathRef.add(link);

            setLinks((links) => [...links, {...link, createdAt: new Date(), id: resp.id},]);

            setOpenModal(false);

        };


        useEffect(() =>{
            const fetchLinks = async () => {
                const snapshot = await linksPathRef.get();


                const tempLinks = [];
                snapshot.forEach((doc) => tempLinks.push({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate()}));
                setLinks(tempLinks);
            }

            fetchLinks()


        }, [linksPathRef]);


        const handleDeleteLink = useCallback (async linkDocID => {
            await linksPathRef.doc(linkDocID).delete();
            setLinks((oldLinks) => oldLinks.filter((link) => link.id !== linkDocID));
        }, [linksPathRef]);


        const handleCopyLink = useCallback(shortUrl =>{
            copy(shortUrl);
            setNewLinkToastr(true);
        }, []);

    return (
        <>
        <Snackbar open={newLinkToastr} onClose={() => setNewLinkToastr(false)} autoHideDuration={2000} message="Link copied to the clipboard" />
        {openModal && <ShortenURLModal createShortenLink={handleCreateShortenLink} handleClose={() => setOpenModal(false)} />}
            <Navbar />
            <Box mt={5}>
                <Grid container justifyContent="center"> 
                    <Grid item xs={8}>
                        <Box mb={5} display="flex">
                            <Box mr={5}>
                                <Typography variant="h4">Links</Typography>
                            </Box>
                            <Button onClick={() => setOpenModal(true)} variant="contained" color="primary">
                                    Create New
                            </Button> 
                        </Box>

                        {links.sort((prevLink, nextLink) => nextLink.createdAt - prevLink.createdAt).map((link, idx) => (
                            <Fragment key={link.id}>
                                <LinkCard 
                                    {...link} 
                                    deleteLink ={handleDeleteLink} 
                                    copyLink = {handleCopyLink} 
                                />
                            { idx !== links.length - 1 && ( 
                                <Box my={4}>
                                    <Divider />
                                </Box>
                            )}
                            </Fragment>     
                        ))}
                    </Grid>  
                </Grid>
            </Box>
        </>
     );
    };

export default Account;





