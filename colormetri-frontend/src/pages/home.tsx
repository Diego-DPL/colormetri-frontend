import React, { useState } from 'react';
import { Button, IconButton, OutlinedInput, InputAdornment, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';

function Home() {
    const [fileName, setFileName] = useState<string>('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [colors, setColors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFileName(file.name);
            setFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleExtractColors = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);

        try {
            const response = await axios.post('https://colormetri-backend-3154dcafc3f1.herokuapp.com/upload-image/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setColors(response.data.colors);
        } catch (error) {
            console.error('Error extracting colors:', error);
        } finally {
            setLoading(false);
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
            <h1 className='text-primary text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-8'>
                Colormetri
            </h1>
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
                        onClick={handleExtractColors}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Extraer Paleta'}
                    </Button>
                </section>
            </section>
            {colors.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Paleta de Colores</h2>
                    <div className="flex flex-wrap">
                        {colors.map((color, index) => (
                            <div key={index} className="flex flex-col items-center m-2">
                                <div className="w-16 h-16" style={{ backgroundColor: color, margin: '4px' }}></div>
                                <p className="text-sm mt-2">{color}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;