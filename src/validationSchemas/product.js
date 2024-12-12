import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Please provide the product name")
    .max(100, "Name cannot exceed 100 characters"),

  description: Yup.string()
    .trim()
    .required("Please provide the product description"),

  price: Yup.number()
    .required("Please provide the product price")
    .min(0, "Price must be a positive number"),

  category: Yup.string().required("Please select a category"),

  subCategory: Yup.string().required("Please select a sub-category"),

  size: Yup.string().oneOf(["XS", "S", "M", "L", "XL"], "Size is not valid"),

  color: Yup.string().trim(),

  material: Yup.string().trim(),

  stock: Yup.number().min(0, "Stock cannot be negative").default(0),

  ratings: Yup.number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating cannot exceed 5")
    .default(0),

  tags: Yup.string().trim().nullable(),

  brand: Yup.string().trim().required("Please provide the brand name"),

  images: Yup.string().trim().nullable(),
});
