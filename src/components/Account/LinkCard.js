import { memo } from "react";
import { Typography, Button, Box } from "@material-ui/core";
import { BarChart as ChartIcon } from "@material-ui/icons";
import format from "date-fns/format";

const LinkCard = ({id, createdAt, name, longURL, shortCode, totalClicks, deleteLink,copyLink }) => {
    console.log("link card rendered");
    const shortUrl = `${window.location.host}/${shortCode}`
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Typography color="textSecondary" variant="overline">
                    Created at {format(createdAt, "d MMM, HH:mm")}
                </Typography>
                <Box my={2}>
                    <Typography variant="h5">{name}</Typography>
                    <Typography>{longURL}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Typography color="primary">{shortUrl}</Typography>
                    <Box mx={3}>
                    <Button onClick={() => copyLink(shortUrl)} size="small" color="primary" variant="outlined">Copy</Button>
                    </Box>
                    <Button onClick={() => deleteLink(id)} size="small" color="secondary" variant="contained">Delete</Button>
                </Box>
            </Box>
            <Box>
                <Box>
                    <Box display="flex" justifyContent="center">
                        <Typography>{totalClicks}</Typography>
                        <ChartIcon />
                    </Box>
                    <Typography variant="overline">Total Clicks</Typography>
                </Box>
            </Box>
        </Box>
        
    );
};

export default memo(LinkCard);
