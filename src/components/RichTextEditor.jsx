import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {TextStyle} from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
//import styles from './RichTextEditor.module.css';
import HardBreak from '@tiptap/extension-hard-break';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import FontSize from './FontSize';
import FontFamily from '@tiptap/extension-font-family';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';

const RichTextEditor = ({ onChange, content}) => {
  console.log("Content: " + content);
  const editor = useEditor({
    extensions: [
      StarterKit,
      HardBreak.extend({
        addKeyboardShortcuts () {
          return {
            Enter: () => editor.commands.setHardBreak()
          }
        }
      }),
  
      TextStyle,
      Color,
      Underline,
      Highlight,
      FontSize,
      FontFamily,
      Image,
      ImageResize,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  
  if (!editor) {
    return null;
  }

  const setFontColor = (color) => {
    editor.chain().focus().setColor(color).run();
  };

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const toggleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  }

  const toggleStrike = () => {
    editor.chain().focus().toggleStrike().run();
  }
  
  const toggleHighlight = () => {
    editor.chain().focus().toggleHighlight().run();
  }

  const handleFontSize = (size) => {
    editor.commands.setFontSize(size);
  }

  const setFontFamily = (font) => {
    editor.commands.setFontFamily(font);  
  }

  const addImage = () => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <input
          className="w-25 mt-2"
          type="color"
          onInput={(e) => setFontColor(e.target.value)}
          defaultValue="#000000"
        />

        <button type='button' className="w-15 m-2 p-2 border-1 rounded" onClick={toggleBold}><strong>B</strong></button>

        <button type='button' className="w-15 m-2 p-2 border-1 rounded" onClick={toggleItalic}><em>I</em></button>
        <button type='button' className="w-15 m-2 p-2 border-1 rounded" onClick={toggleUnderline}><u>U</u></button>
        <button type='button' className="w-15 m-2 p-2 border-1 rounded" onClick={toggleStrike}><del>S</del></button>
        <button type='button' className="w-15 m-2 p-2 border-1 rounded" onClick={toggleHighlight}>H</button>
        <select className="m-2 border-solid border-1 rounded p-2" onChange={(e) => handleFontSize(e.target.value)}>
            <option value="10">10px</option>
            <option value="12">12px</option>
            <option value="14">14px</option>
            <option value="16">16px</option>
            <option value="20">20px</option>
            <option value="24">24px</option>
            <option value="18">18px</option>
            <option value="36">36px</option>
            <option value="50">50px</option>
        </select>
        <select className="border-solid border-1 rounded mb-2 mt-2" onChange={(e) => setFontFamily(e.target.value)}>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Comic Sans MS, Comic Sans">Comic Sans MS</option>
            <option value="Verdana">Verdana</option>
            <option value="Arial">Arial</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Brush Script MT">Brush Script MT</option>
            <option value="Courier New ">Courier New </option>
        </select>
        <button className="w-15 m-2 p-2 border-1 rounded" onClick={addImage}>+</button>
      </div>
      
      <div className="w-200"> 
        <EditorContent className="[&>div]:h-100 bg-sky-100 border-1 border-solid overflow-scroll pl-1 pr-2 focus:outline-none" editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
