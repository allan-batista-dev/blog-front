"use client";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importe o CSS padrão ou escolha um tema de estilo diferente

const MyEditor = ({content}: any) => {

  return  <ReactQuill theme="snow" value={content}/>
}

export default MyEditor;
