import React from 'react';
import { ImageIcon, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import ServerUrl from '@/service/ServerUrl';

const ImageUpload = ({
  isDragActive,
  getRootProps,
  getInputProps,
  uploadedImages,
  removeImage,
  updateData
}: any) => {
  console.log(updateData);
  return (
    <div className=" flex flex-col gap-2 rounded-lg border border-border p-4 text-center">
      <div
        {...getRootProps()}
        className="h-[180px] cursor-pointer rounded border-2 border-dashed border-border p-4"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="flex h-full items-center justify-center text-gray-600">
            Drop the files here ...
          </p>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            {updateData ? (
              Array.isArray(updateData) ? (
                <div className="grid w-full  grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] gap-2">
                  {updateData.map((e, index) => {
                    return (
                      <Image
                        key={index}
                        height={500}
                        width={500}
                        src={`${ServerUrl}/${e}`}
                        alt="banner "
                        className="h-[60px] w-full object-contain"
                      />
                    );
                  })}
                </div>
              ) : (
                <Image
                  height={500}
                  width={500}
                  src={`${ServerUrl}/${updateData}`}
                  alt="banner "
                  className="h-full w-full object-contain"
                />
              )
            ) : (
              <>
                <ImageIcon size={60} className="mx-auto text-gray-400" />
                <p className="mt-2  text-sm text-gray-500">
                  Drag & drop or click to select up to 7 images (*.png, *.jpg,
                  *.jpeg).
                </p>
              </>
            )}
          </div>
        )}
      </div>
      {uploadedImages.length > 0 && (
        <ScrollArea className="h-full">
          <div className="mt-2 flex max-h-[200px] flex-wrap gap-2">
            {uploadedImages.map((file: any, index: number) => (
              <div
                key={index}
                className="relative flex w-full items-start gap-2 text-sm text-gray-500"
              >
                <div className="flex gap-2 ">
                  <Image
                    height={200}
                    width={200}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-20 w-20 rounded-md border object-cover shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-1 top-1 rounded-full border border-muted bg-card p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                  <p className="line-clamp-2 w-full pt-1 text-start">
                    {file.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ImageUpload;
