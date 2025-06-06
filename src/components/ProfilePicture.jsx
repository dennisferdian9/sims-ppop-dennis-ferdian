import React, { useRef, useEffect } from 'react';
import pencilIcon from '@/assets/pencil.svg';
import profilePhoto from '@/assets/profile-photo.png';

export default function ProfilePicture({ src, name, disabled, onChange }) {
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (typeof src !== 'string' && src) {
      const objectUrl = URL.createObjectURL(src);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [src]);

  const handlePencilClick = (e) => {
    e.stopPropagation(); 
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const changeInputHandler = (event) => {
    const file = event.target.files[0];
    onChange(file);
  };

  const imageLink = typeof src === 'string' ? src : URL.createObjectURL(src);

  return (
    <div className="rounded-full size-28 relative">
      <img className="size-full object-cover rounded-full" src={imageLink.length ? imageLink : profilePhoto} alt={name} />
      {!disabled && (
        <button
          type='button'
          className="absolute right-1 bg-white border border-gray-300 bottom-1 size-6 p-1 rounded-full cursor-pointer"
          onClick={handlePencilClick}
        >
          <img className="size-full" src={pencilIcon} alt="ubah foto" />
        </button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={changeInputHandler}
      />
    </div>
  );
}
