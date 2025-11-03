import React from 'react';
import { ApiOption } from '@/app/types'; // ایمپورت نوع داده
import { Check } from "lucide-react";

type Props = {
  name: string;
  options: ApiOption[]; // استفاده از نوع داده API
  selectedValue: string;
  onChange: (value: string) => void;
};

const RadioGroup = ({ name, options, selectedValue, onChange }: Props) => {
  return (
    <div className="flex flex-wrap items-end gap-2">
      {options.map((option) => {
        const isSelected = option.value === selectedValue;

        const baseClasses =
          "x justify-items-center text-center relative px-3 py-1 text-sm font-medium border rounded-sm cursor-pointer transition-colors duration-200";
        const selectedClasses =
          "bg-blue-100 border-blue-500 text-blue-700";
        const defaultClasses =
          "bg-white border-gray-300 text-gray-700 hover:bg-gray-50";

        return (
          <div key={option.id}>
            <input
              type="radio"
              id={`${name}-${option.id}`}
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />

            <label
              htmlFor={`${name}-${option.id}`}
              className={`${baseClasses} ${
                isSelected ? selectedClasses : defaultClasses
              }`}
            >

              {option.file_url && (
                  <img
                      src={option.file_url}
                      alt={option.display_name || ""}
                      width="60"
                      className="mb-1"
                  />
              )}

              {option.display_name}

              {/* مثلث گوشه پایین راست با تیک داخلش */}
              {isSelected && (
                <span className="absolute bottom-0 right-0 w-0 h-0 border-b-[16px] border-l-[16px] border-b-blue-500 border-l-transparent">
                  <Check
                    size={9}
                    strokeWidth={3}
                    className="absolute top-[7px] left-[-9px] text-white"
                  />
                </span>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioGroup;