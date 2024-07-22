import React, { useState } from 'react';
import { Button, IconButton, OutlinedInput, InputAdornment, FormControl, InputLabel } from "@mui/material";
import { PhotoCamera } from '@mui/icons-material';

function Home() {
    const [fileName, setFileName] = useState<string>('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFileName(file.name);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const textFieldStyles = {
        "& label": {
            color: "#4A4A4A",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#4A4A4A",
                borderRadius: "10px",
                borderWidth: "2px",
            },
            "&:hover fieldset": {
                borderColor: "#000",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#000",
            },
            "& .MuiOutlinedInput-input": {
                color: "#4A4A4A",
            },
        },
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center p-4 bg-background">
            <h1 className='text-primary text-8xl font-bold text-center mb-8'>Colormetri</h1>
            {imagePreviewUrl && (
                <div className="mb-8 flex justify-center">
                    <img src={imagePreviewUrl} alt="Preview" className="w-80 h-auto rounded-lg shadow-md" />
                </div>
            )}
            <section className='flex flex-col items-center justify-center w-full max-w-md'>
                <FormControl fullWidth margin="normal" sx={textFieldStyles}>
                    <InputLabel htmlFor="outlined-adornment-file-input">Adjuntar imagen</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-file-input"
                        type="text"
                        value={fileName}
                        readOnly
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="upload picture"
                                    component="label"
                                >
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                    <PhotoCamera />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Adjuntar imagen"
                    />
                </FormControl>
                <section className='mt-8'>
                    <Button
                        variant="contained"
                        size="large"
                        style={{ backgroundColor: '#FF6F61' }}
                    >
                        Extraer Paleta
                    </Button>
                </section>
            </section>
        </div>
    );
}

export default Home;