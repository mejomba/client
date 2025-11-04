import { Info } from 'lucide-react';
import React, { useState, useRef } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
} from '@floating-ui/react';
import {Guid} from "@/app/types";

type Props = {
  label: string;
  guid: Guid;
  children: React.ReactNode;
};

const FormField = ({ label, guid, children }: Props) => {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const { refs, floatingStyles, middlewareData, placement, update } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'top',
    middleware: [offset(8), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate, // ← این قسمت باعث رفتار هوشمند و بلادرنگ میشه
  });
  console.log(update)

  // موقعیت فلش بر اساس جهت Tooltip
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]] as string;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 py-3">
      <label className="text-sm font-medium text-gray-600 flex items-center col-span-1 justify-between">
        {label}

        {guid && (<div
          className="relative inline-block"
          ref={refs.setReference}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* آیکون علامت سؤال */}
          <Info size={18} className="text-blue-500" />

          {/* Tooltip */}
          {open && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={`z-50 w-96 rounded-lg bg-white p-4 text-sm text-gray-700 shadow-xl border border-gray-200 transition-all duration-200 ease-out
                ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              `}
            >
              {/* فلش */}
              <div
                ref={arrowRef}
                className="absolute w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45"
                style={{
                  left: middlewareData.arrow?.x ?? '',
                  top: middlewareData.arrow?.y ?? '',
                  [staticSide]: '-0.4rem',
                }}
              />

              {/* محتوا */}
              <div dangerouslySetInnerHTML={{ __html: guid.guid_content }} className="mb-3" />
              <a href={`/help/post/${guid.slug}`} target="_blank">show more</a>
            </div>
          )}
        </div>)}
      </label>

      <div className="flex flex-wrap items-center gap-2 col-span-1 md:col-span-3">
        {children}
      </div>
    </div>
  );
};

export default FormField;
