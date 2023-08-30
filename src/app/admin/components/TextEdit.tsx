"use client";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importe o CSS padrão ou escolha um tema de estilo diferente

import React, { useState } from 'react';

const MyEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleEditorChange = (html: any) => {
    setEditorHtml(html);
  };

  return (
    <div>
      <ReactQuill
        theme="snow" // Escolha o tema do editor
        value={editorHtml}
        onChange={handleEditorChange}
      />
      {/* O conteúdo do editor de texto pode ser acessado em editorHtml */}
    </div>
  );
};

export default MyEditor;
