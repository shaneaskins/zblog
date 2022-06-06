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
import TextField from '@mui/material/TextField';

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

const Dashboard = () => {

    const [ posts, setPosts ] = useState([]);
    const [ createMode, setCreateMode ] = useState(false);

    useEffect(() => {
        try {
            fetch(
                "/api/dashboard", {
                    method: "GET",
                    headers: {
                        "authorization": window.localStorage.getItem("token"),
                    },
                }
            )
            .then(res => res.json())
            .then(data => setPosts(data))
        }
        catch (err) {
            console.error(err)
        }
    }, []);

    const handleCreateMode = async (event) => {
        event.preventDefault();
        setCreateMode(!createMode)
    };

    const handleCreate = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const newTitle = data.get("title");
        const newContent = data.get("content");
        console.log(newTitle)
    
        fetch(
          `/api/post/create`, {
              method: "POST",
              headers: {
                  'Content-Type':'application/json',
                  "authorization": window.localStorage.getItem("token"),
              },
              body: JSON.stringify(
                {
                  title: newTitle,
                  content: newContent
                }
              )
          }
        )
        .then(res => res.json())
        .then(data => console.log(data))
      };

    const handleCancel = (event) => {
        event.preventDefault();
        setCreateMode(!createMode)
    };

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
                My posts
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Here are all the posts that my user has authored. All served with love from Postgres / Heroku.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={e => handleCreateMode(e)}
                  >
                    Create Post
                  </Button>
                </Box>
                {!!(createMode) && (
                    <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="title"
                        label="title"
                        name="title"
                        autoComplete="title"
                        InputProps={{
                        style: { fontSize: 30 },
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        multiline
                        name="content"
                        label="content"
                        type="content"
                        id="content"
                        autoComplete="content"
                        InputProps={{
                        style: { fontSize: 30 },
                        }}
                    />
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        }}
                    >
                        <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Save
                        </Button>
                        <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={e => handleCancel(e)}
                        >
                        Cancel
                        </Button>
                    </Box>
                </Box>
                )}
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

export default Dashboard;