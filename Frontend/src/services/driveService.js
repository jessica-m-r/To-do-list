const BASE_URL = "/files";

function getToken(){
  return localStorage.getItem("token");
}

function authHeader(){
  return{"x-access-token":getToken()};
}

export const uploadFile=async(file)=>{
  const formData=new FormData();
  formData.append("archivo",file);
  const res=await fetch(BASE_URL,{
    method:"POST",
    headers:authHeader(),
    body:formData
  });
  if(!res.ok)throw new Error(`Error al subir archivo: ${res.statusText}`);
  return res.json();
};

export const getFiles=async()=>{
  const res=await fetch(BASE_URL,{
    headers:authHeader()
  });
  if(!res.ok)throw new Error(`Error al obtener archivos: ${res.statusText}`);
  return res.json();
};

export const deleteFile=async(id)=>{
  const res=await fetch(`${BASE_URL}/${id}`,{
    method:"DELETE",
    headers:authHeader()
  });
  if(!res.ok)throw new Error(`Error al eliminar archivo: ${res.statusText}`);
  return res.json();
};

export const downloadFile = async (id, filename) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}/download`, {
            headers: authHeader()
        });
        if (!response.ok) throw new Error('Error al descargar');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'descarga';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error);
        alert('No se pudo descargar el archivo');
    }
};