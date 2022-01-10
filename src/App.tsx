import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as GiphyLogo } from './giphy-logo.svg';

import './App.css';
import { GiphyImageList } from './components/GiphyImageList';
import { ImageSearch } from './components/ImageSearch';
import { Grid } from '@mui/material';

const theme = createTheme();


function App() {

  const [searchQuery, setSearchQuery] = React.useState<string | undefined>();

  const onSearchQueryChange = (newSearchQuery: string | undefined) => {
    console.log("Search Query: ", newSearchQuery);
    setSearchQuery(newSearchQuery);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" sx={{ background: "linear-gradient(45deg, rgb(230, 70,182) 0%, rgb(97, 87, 255) 100%);" }}>
        <Toolbar>
          <Grid container direction="row" justifyContent='center' alignItems='center' >
            <SvgIcon component={GiphyLogo} sx={{ mr: 2}} inheritViewBox />
            <Typography variant="h6" color="inherit" noWrap>
              Giphy Image Gallery
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container direction="row"
            justifyContent='center' alignItems='center'>
            <Grid item xs={4} sx={{mb: 4}} >
              <ImageSearch onSearchQueryChange={onSearchQueryChange} />
            </Grid>
            <Grid item xs={12}>
              <GiphyImageList searchQuery={searchQuery} />
            </Grid>

          </Grid>
        </Container>
      </Box>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Developed by Tharkana
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default App;
