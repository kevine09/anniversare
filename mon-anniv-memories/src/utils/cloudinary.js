/**
 * Upload un fichier vers Cloudinary (front-end)
 * @param {File} file - Le fichier à uploader
 * @param {string} folderName - Dossier de destination
 * @returns {Promise<string>} - L'URL du fichier après upload
 */
export const uploadToCloudinary = async (file, folderName) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Doit être un preset unsigned
  formData.append('folder', folderName || 'misc');
  // Ne pas ajouter api_key manuellement pour les uploads unsigned

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/djkzxkjtf/upload`, // Retire /auto/
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Erreur Cloudinary:', error);
    throw new Error(`Échec de l'upload: ${error.message}`);
  }
};