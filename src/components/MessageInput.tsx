import { useChatStore } from '@/store/useChatStore';
import { SendHorizonal, X } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react'

import { Image as LucideImage } from 'lucide-react'
import toast from 'react-hot-toast';

const MessageInput = () => {
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { sendMessage } = useChatStore();

  const handleImageChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];

    if( file && !file.type.startsWith('image/') ) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string' || reader.result === null) {
        setImagePreview(reader.result);
      } else {
        setImagePreview(null);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const removeImage = () => {
    setImagePreview(null);
    if( fileInputRef.current ) fileInputRef.current.value = "";
  }

  const handleSendMessage:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if( !text.trim() && !imagePreview ) return;
    try {
      await sendMessage({
          text: text.trim(),
          image: imagePreview
      });

      setText("");
      setImagePreview(null);
      inputRef.current?.focus;
      if( fileInputRef.current ) fileInputRef.current.value = '';
    } catch (error) {
      
    }
  }

  return (
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <Image
              src={imagePreview}
              alt='Image preview'
              height={80}
              width={80}
              className='w-20 h-20 object-cover rounded-lg border border-zinc-700'/>
            <button 
              onClick={removeImage}
              className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center'
              type='button'>
                <X className='size-3'/>
              </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input 
            type='text'
            className='w-full input input-bordered rounded-lg input-sm sm:input-md focus:outline-none'
            placeholder='Type a message...'
            value={text}
            ref={inputRef}
            onChange={(e) => setText(e.target.value)}/>
          <input 
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}/>
          <button
            type='button'
            className={`hidden sm:flex btn btn-circle
            ${ imagePreview? 'text-emerald-500' : 'text-zinc-400' }`}
            onClick={() => fileInputRef.current?.click()}>
            <LucideImage size={20} />
          </button>
        </div>
        <button
          type='submit'
          className='btn btn-circle hover:bg-accent hover:text-accent-content'
          disabled={!text.trim() && !imagePreview}>
            <SendHorizonal size={22}/>
        </button>
      </form>
    </div>
  )
}

export default MessageInput;