"use client";

import { useState, useEffect } from "react";
import { ApiGroup, ApiResponse, ApiAttribute } from "@/app/types";
import api from "@/lib/axios_client";
import Accordion from "@/components/Accordion";
import FormField from "@/components/FormField";
import RadioGroup from "@/components/RadioGroup";
import { submitPcbForm } from "./actions";
import {log} from "util"; // ایمپورت اکشن سروری

const initializeFormData = (groups: ApiGroup[]): { [key: string]: string } => {
  const initialState: { [key: string]: string } = {};
  groups.forEach((group) => {
    group.attributes.forEach((attr) => {
      const defaultOption = attr.options.find((opt) => opt.is_default);
      if (defaultOption) {
        initialState[attr.name] = defaultOption.value;
      }
    });
  });
  return initialState;
};

export default function PcbOrderPage() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [payload, setPayload] = useState<{ [key: string]: string }>({});
  const [groups, setGroups] = useState<ApiGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get<ApiResponse>("/pcb/groups/");
        setGroups(response.data.results);
        setFormData(initializeFormData(response.data.results));
      } catch (err) {
        setError("خطا در دریافت اطلاعات.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFormChange = (attributeName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [attributeName]: value }));
  };

  const renderFormControl = (attribute: ApiAttribute) => {
    switch (attribute.control_type) {
      case "radio_button":
        return (
          <RadioGroup
            name={attribute.name}
            options={attribute.options}
            selectedValue={formData[attribute.name] || ""}
            onChange={(value) => handleFormChange(attribute.name, value)}
          />
        );
      case "text_input":
        return (
            <>
            <RadioGroup
            name={attribute.name}
            options={attribute.options}
            selectedValue={formData[attribute.name] || ""}
            onChange={(value) => handleFormChange(attribute.name, value)}
          />
          <input
            type="text"
            value={formData[attribute.name] || ""}
            onChange={(e) => handleFormChange(attribute.name, e.target.value)}
            className="w-24 border border-gray-300 rounded-sm p-1 text-center text-sm"
          />
              </>
        );
      default:
        return null;
    }
  };

  const buildSubmitPayload = (formData: { [key: string]: string }, groups: ApiGroup[]) => {
    const selections: {
      attribute: number;
      selected_option: number | null;
      value: string | number | null;
    }[] = [];

    groups.forEach(group => {
      group.attributes.forEach(attr => {
        const selectedValue = formData[attr.name];

        // گزینه‌ی انتخاب‌شده را از attribute.options پیدا کن
        const selectedOption = attr.options.find(opt => opt.value === selectedValue);

        selections.push({
          attribute: attr.id,
          selected_option: selectedOption ? selectedOption.id : null,
          value: selectedValue || null,
        });
      });
    });

    return {
      quantity: 1,
      status: "pending",
      selections,
    };
  };

  const handleSubmit_ = async () => {
    try {
      setSubmitting(true);
      setSubmitMessage(null);

      const payload = buildSubmitPayload(formData, groups);
      const result = await submitPcbForm(payload);

      // const result = await submitPcbForm(formData);

      if (result.success) {
        setSubmitMessage("✅ فرم با موفقیت ثبت شد!");
      } else {
        setSubmitMessage(`❌ ${result.message}`);
      }
    } catch (e) {
      setSubmitMessage("❌ خطا در ارسال فرم");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmitMessage(null);

      const payload = buildSubmitPayload(formData, groups);

      // 👇 ساخت FormData برای ارسال multipart
      const form = new FormData();
      form.append("quantity", payload.quantity.toString());
      form.append("status", payload.status);

      // selections را به صورت JSON درون FormData بفرست
      form.append("selections", JSON.stringify(payload.selections));

      // 👇 اضافه کردن فایل (اگر انتخاب شده)
      if (formData.file) {
        form.append("file", formData.file); // formData.file باید از <input type="file"> گرفته شود
      }

      // 👇 حالا ارسال به سرور
      const result = await submitPcbForm(form);

      if (result.success) {
        setSubmitMessage("✅ فرم با موفقیت ثبت شد!");
      } else {
        setSubmitMessage(`❌ ${result.message}`);
      }
    } catch (e) {
      console.error(e);
      setSubmitMessage("❌ خطا در ارسال فرم");
    } finally {
      setSubmitting(false);
    }
};


  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const mainGroup = groups.find((g) => g.name === "main");
  const accordionGroups = groups.filter((g) => g.name !== "main");

  return (
    <main className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md py-6 px-3">
        <input
            type="file"
            onChange={(e) => setFormData({...formData, file: e.target.files?.[0]})}
        />

        {mainGroup && (
          <div className="space-y-4">
            {mainGroup.attributes.map((attr) => (
              <FormField key={attr.id} label={attr.display_name} guid={attr.guid}>
                {renderFormControl(attr)}
              </FormField>
            ))}
          </div>
        )}
        {accordionGroups.map((group) => (
          <Accordion key={group.id} title={group.display_name}>
            <div className="divide-y divide-gray-200 px-2">
              {group.attributes.map((attr) => (

                <FormField key={attr.id} label={attr.display_name} guid={attr.guid}>
                  {renderFormControl(attr)}
                </FormField>
              ))}
            </div>
          </Accordion>
        ))}

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {submitting ? "در حال ارسال..." : "ثبت سفارش"}
          </button>
        </div>

        {submitMessage && (
          <p className="text-center mt-4 text-sm font-medium">
            {submitMessage}
          </p>
        )}

        {/* نمایش وضعیت فرم */}
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold">Current Form State:</h3>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
