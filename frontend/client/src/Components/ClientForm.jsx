import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';

const ClientForm = ({tca, handleInputChange}) => {
    return (
    <>
        <TextField
            label="First Name"
            name="firstName"
            value={tca?.firstName || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
        />
        <TextField
            label="Last Name"
            name="lastName"
            value={tca?.lastName || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
        />
        <TextField
            label="Address"
            name="address"
            value={tca?.address || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
        />
        <TextField
            label="Description"
            name="description"
            value={tca?.description || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
        />
        <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
            Save Client Info
        </Button>
    </>
    );
};

export default ClientForm;