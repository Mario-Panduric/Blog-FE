import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {TextStyle} from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import styles from './RichTextEditor.module.css';
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
    <div className={styles.wrapper}>
      <div className={styles.textEdit}>
        <input
          className={styles.colorInput}
          type="color"
          onInput={(e) => setFontColor(e.target.value)}
          defaultValue="#000000"
        />

        <button type='button' className={styles.button} onClick={toggleBold}><strong>B</strong></button>

        <button type='button' className={styles.button} onClick={toggleItalic}><em>I</em></button>
        <button type='button' className={styles.button} onClick={toggleUnderline}><u>U</u></button>
        <button type='button' className={styles.button} onClick={toggleStrike}><del>S</del></button>
        <button type='button' className={styles.button} onClick={toggleHighlight}>H</button>
        <select onChange={(e) => handleFontSize(e.target.value)}>
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
        <select onChange={(e) => setFontFamily(e.target.value)}>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Comic Sans MS, Comic Sans">Comic Sans MS</option>
            <option value="Verdana">Verdana</option>
            <option value="Arial">Arial</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Brush Script MT">Brush Script MT</option>
            <option value="Courier New ">Courier New </option>
        </select>
        <button className={styles.button} onClick={addImage}>+</button>
      </div>
      
      <div className={styles.pa}>
        <EditorContent className={styles.editor} editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
