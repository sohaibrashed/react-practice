import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import LoadingSpinner from "../ui/loadingSpinner";
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
} from "@/services/categoryApi";
import { Textarea } from "../ui/textarea";
import useFormValidation from "@/hooks/useFormValidation";
import { productValidationSchema } from "@/validationSchemas/product";
import FormError from "../FormError";

export default function ProductFormDialog({
  onSubmit,
  product = {},
  isEdit = false,
  isLoading = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useFormValidation(productValidationSchema, {
    name: product.name || "",
    description: product.description || "",
    price: product.price || "",
    category: product.category?.name || "",
    subCategory: product.subCategory?.name || "",
    size: product.size || "",
    color: product.color || "",
    material: product.material || "",
    stock: product.stock || "",
    tags: product.tags?.join("\n") || "",
    brand: product.brand || "",
    images: product.images?.join("\n") || "",
  });

  const { data: categories } = useGetCategoriesQuery();
  const { data: subCategories } = useGetSubCategoriesQuery();

  const category = watch("category");
  const subCategory = watch("subCategory");

  const onSubmitForm = (formData) => {
    if (isLoading) return;

    const data = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      tags: formData?.tags.split(",").map((tag) => tag.trim()),
      images: formData.images?.split("\n").map((url) => url.trim()),
    };

    if (isEdit) {
      onSubmit(data, product._id);
    } else {
      onSubmit(data);
    }

    reset();
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Update Product" : "Add Product"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update the details of the existing product."
            : "Fill in the details to add a new product."}
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="space-y-4 max-h-[70vh] overflow-y-auto px-2"
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            required
            id="name"
            name="name"
            type="text"
            placeholder="Enter product name"
            disabled={isLoading}
            {...register("name")}
          />
          {errors.name && <FormError message={errors?.name?.message} />}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            type="text"
            placeholder="Enter product description"
            disabled={isLoading}
            {...register("description")}
          />
          {errors.description && (
            <FormError message={errors?.description?.message} />
          )}
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            required
            id="price"
            name="price"
            type="number"
            step="any"
            placeholder="Enter price"
            disabled={isLoading}
            {...register("price")}
          />
          {errors.price && <FormError message={errors?.name?.message} />}
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            required
            disabled={isLoading}
            value={category}
            onValueChange={(value) => setValue("category", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.data.map((category) => (
                <SelectItem key={category._id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <FormError message={errors.category.message} />}
        </div>

        <div>
          <Label htmlFor="subCategory">SubCategory</Label>
          <Select
            required
            disabled={isLoading}
            value={subCategory}
            onValueChange={(value) => setValue("subCategory", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a sub-category" />
            </SelectTrigger>
            <SelectContent>
              {subCategories?.data
                ?.filter((sub) => sub?.category?.name === category)
                .map((sub) => (
                  <SelectItem key={sub._id} value={sub.name}>
                    {sub.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.subCategory && (
            <FormError message={errors.subCategory.message} />
          )}
        </div>

        <div>
          <Label htmlFor="size">Size</Label>
          <Input
            id="size"
            name="size"
            type="text"
            placeholder="Enter size (e.g., S, M, L)"
            disabled={isLoading}
            {...register("size")}
          />
          {errors.size && <FormError message={errors?.size?.message} />}
        </div>

        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            name="color"
            type="text"
            placeholder="Enter color"
            disabled={isLoading}
            {...register("color")}
          />
          {errors.color && <FormError message={errors?.color?.message} />}
        </div>

        <div>
          <Label htmlFor="material">Material</Label>
          <Input
            id="material"
            name="material"
            type="text"
            placeholder="Enter material (e.g., Cotton, Wool)"
            disabled={isLoading}
            {...register("material")}
          />
          {errors.material && <FormError message={errors?.material?.message} />}
        </div>

        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            className="appearance-none"
            required
            id="stock"
            name="stock"
            type="number"
            placeholder="Enter stock quantity"
            disabled={isLoading}
            {...register("stock")}
          />
          {errors.stock && <FormError message={errors?.stock?.message} />}
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            type="text"
            placeholder="Enter tags (comma-separated)"
            disabled={isLoading}
            {...register("tags")}
          />
          {errors.tags && <FormError message={errors?.tags?.message} />}
        </div>

        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            type="text"
            placeholder="Enter brand"
            disabled={isLoading}
            {...register("brand")}
          />
          {errors.brand && <FormError message={errors?.brand?.message} />}
        </div>

        <div>
          <Label htmlFor="images">Images</Label>
          <Textarea
            id="images"
            name="images"
            rows="3"
            placeholder="Enter image URLs (one per line)"
            disabled={isLoading}
            {...register("images")}
          ></Textarea>
          {errors.images && <FormError message={errors?.images?.message} />}
        </div>

        <div className="mt-4">
          <Button disabled={isLoading} className="w-full">
            {isLoading ? <LoadingSpinner /> : isEdit ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
