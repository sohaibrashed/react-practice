import { useState } from "react";
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

export default function ProductFormDialog({
  onSubmit,
  product = {},
  isEdit = false,
  isLoading = false,
}) {
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || "");
  const [category, setCategory] = useState(product.category?.name || "");
  const [subCategory, setSubCategory] = useState(
    product.subCategory?.name || ""
  );
  const [size, setSize] = useState(product.size || "");
  const [color, setColor] = useState(product.color || "");
  const [material, setMaterial] = useState(product.material || "");
  const [stock, setStock] = useState(product.stock || "");
  const [tags, setTags] = useState(product.tags?.join(", ") || "");
  const [brand, setBrand] = useState(product.brand || "");
  const [images, setImages] = useState(product.images?.join("\n") || "");

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategoriesQuery();

  const {
    data: subCategories,
    isLoading: subCategoriesLoading,
    isError: subCategoriesError,
  } = useGetSubCategoriesQuery();

  const handleSubmit = () => {
    if (isLoading) return;

    if (!name || !price || !category || !stock) return;

    const data = {
      name,
      description,
      price: parseFloat(price),
      category,
      subCategory,
      size,
      color,
      material,
      stock: parseInt(stock, 10),
      tags: tags.split(",").map((tag) => tag.trim()),
      brand,
      images: images.split("\n").map((url) => url.trim()),
    };

    if (isEdit) {
      onSubmit(data, product._id);
    } else {
      onSubmit(data);
    }
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          {isEdit ? "Update Product" : "Create Product"}
        </DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update the details of the existing product."
            : "Fill in the details to create a new product."}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto px-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            required
            id="name"
            name="name"
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            type="text"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            required
            id="price"
            name="price"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            required
            disabled={isLoading}
            value={category}
            onValueChange={(value) => setCategory(value)}
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
        </div>

        <div>
          <Label htmlFor="subCategory">SubCategory</Label>
          <Select
            required
            disabled={isLoading}
            value={subCategory}
            onValueChange={(value) => setSubCategory(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a sub-category" />
            </SelectTrigger>
            <SelectContent>
              {subCategories?.data
                .filter((sub) => sub?.category?.name === category)
                .map((category) => (
                  <SelectItem key={category._id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="size">Size</Label>
          <Input
            id="size"
            name="size"
            type="text"
            placeholder="Enter size (e.g., S, M, L)"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            name="color"
            type="text"
            placeholder="Enter color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="material">Material</Label>
          <Input
            id="material"
            name="material"
            type="text"
            placeholder="Enter material (e.g., Cotton, Wool)"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            required
            id="stock"
            name="stock"
            type="number"
            placeholder="Enter stock quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            type="text"
            placeholder="Enter tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            name="brand"
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="images">Images</Label>
          <Textarea
            id="images"
            name="images"
            rows="3"
            placeholder="Enter image URLs (one per line)"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            disabled={isLoading}
          ></Textarea>
        </div>

        <div className="mt-4">
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full"
          >
            {isLoading ? <LoadingSpinner /> : isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
