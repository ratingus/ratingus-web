export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const getFromForm = (formData: FormData, fieldName: string) =>
  (formData.get(fieldName)?.toString() || "").trim() || null;
