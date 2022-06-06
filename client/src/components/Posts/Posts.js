import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link } from "react-router-dom"

import { useState, useEffect } from "react";

const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <a href="https://shaneaskins-zblog.herokuapp.com/">
          My ZBlog :)
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
};

const theme = createTheme();

const Posts = () => {

    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        try {
            fetch(
                "/api/posts", {
                    method: "GET"
                }
            )
            .then(res => res.json())
            .then(data => setPosts(data))
        }
        catch (err) {
            console.error(err)
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
            <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
            >
            <Container maxWidth="sm">
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                All posts
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Here are all the posts "created" for this blog. All served with love from Postgres / Heroku.
                </Typography>
            </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4}>
                {posts.map((post) => (
                <Grid item key={post.title} xs={12} sm={6} md={4}>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardMedia
                        component="img"
                        image="https://source.unsplash.com/random"
                        alt="random"
                        height="200px"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="subtitle2">
                        {post.date_created.substring(0, post.date_created.indexOf("T"))}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                        </Typography>
                        <Typography>
                        {post.content.replace(/^(.{100}[^\s]*).*/, "$1...")}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to={"/post/" + post.id}>
                            <Button size="small">View</Button>
                        </Link>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container>
        </main>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Copyright />
        </Box>
        </ThemeProvider>
    );
}

export default Posts;