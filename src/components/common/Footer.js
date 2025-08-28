import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import FooterLinks from './FooterLinks';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.100',
        color: 'text.primary',
        pt: 6,
        pb: 4,
        mt: 8,
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={20}>
          {/* Cột 1: Giới thiệu */}
          <Grid item xs={13} md={5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              TDTU iBanking System
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Nền tảng thanh toán dịch vụ học phí dành cho sinh viên TDTU. Bảo mật, tiện lợi và hiện đại.
            </Typography>
          </Grid>
          
          {/* Cột 3: Mạng xã hội */}
          <Grid item xs={6} md={5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Kết nối với chúng tôi
            </Typography>
            <Box>
              <IconButton href="https://facebook.com" target="_blank" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" color="primary">
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://github.com" target="_blank" color="primary">
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Cột 2: Liên kết */}
          <Grid item xs={6} md={5}>
            <FooterLinks /> 
          </Grid>

        </Grid>

        {/* Bản quyền */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Trương Dev. Made with ❤️ in TDTU.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
