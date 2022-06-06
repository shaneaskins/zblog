import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAuth } from "../../hooks/useAuth";
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

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

const Post = () => {

  const [ post, setPost ] = useState([])
  const [ editMode, setEditMode ] = useState(false)

  const { post_id } = useParams()
  const { user, userId } = useAuth();

  const navigate = useNavigate();

  console.log(userId)

  useEffect(() => {
    try {
      fetch(
          `/api/post/${post_id}`, {
              method: "GET",
          }
      )
      .then(res => res.json())
      .then(data => setPost(data))
    }
    catch (err) {
      console.log(err)
    }
  }, []);

  const handleEditMode = async (event) => {
    event.preventDefault();
    setEditMode(!editMode)
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    fetch(
      `/api/post/${post_id}`, {
          method: "DELETE",
          headers: {
              "authorization": window.localStorage.getItem("token"),
          }
      }
    )
    .then(res => res.json())
    .then(data => console.log(data))
    navigate("/dashboard")
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setEditMode(!editMode)
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newTitle = data.get("title");
    const newContent = data.get("content");
    console.log(newTitle)

    fetch(
      `/api/post/${post_id}`, {
          method: "PUT",
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

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {post.map((p) => (
            <Box key={p.id} component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="title"
                label="title"
                name="title"
                autoComplete="title"
                defaultValue={p.title}
                InputProps={{
                  readOnly: !editMode,
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
                defaultValue={p.content}
                InputProps={{
                  readOnly: !editMode,
                  style: { fontSize: 30 },
                }}
              />
              {!!(userId === p.user_id) && (
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
                    onClick={e => handleEditMode(e)}
                  >
                    Toggle Edit
                  </Button>
                </Box>
              )}
              {!!(editMode) && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
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
              {!!(userId === p.user_id) && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={e => handleDelete(e)}
                  >
                    Delete Post
                  </Button>
                </Box>
              )}
              <br/><br/>
              <Typography component="subtitle1" variant="subtitle1">
                Created: {p.date_created.substring(0, p.date_created.indexOf("T"))}
                <br/>
                Last modified: {p.date_modified.substring(0, p.date_created.indexOf("T"))}
              </Typography>
            </Box>
          ))}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Post;