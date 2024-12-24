import { useState, useEffect } from "react";

export function useVariantSelector(product, cartItem) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (cartItem) {
      setSelectedColor(cartItem.selectedVariant.color);
      setSelectedSize(cartItem.selectedVariant.size);
      setSelectedVariant(cartItem.selectedVariant);
    } else if (product?.variants?.length > 0) {
      const firstVariant = product.variants[0];
      setSelectedColor(firstVariant.color);
      setSelectedSize(firstVariant.size);
      setSelectedVariant(firstVariant);
    }
  }, [product, cartItem]);

  const getAvailableSizes = (color) => {
    return (
      product?.variants.filter((v) => v.color === color).map((v) => v.size) ||
      []
    );
  };

  const getVariant = (color, size) => {
    return product?.variants.find((v) => v.color === color && v.size === size);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const sizes = getAvailableSizes(color);
    setSelectedSize(sizes[0]);
    setSelectedVariant(getVariant(color, sizes[0]));
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedVariant(getVariant(selectedColor, size));
  };

  return {
    selectedColor,
    selectedSize,
    selectedVariant,
    availableColors: [...new Set(product?.variants.map((v) => v.color))],
    availableSizes: getAvailableSizes(selectedColor),
    handleColorChange,
    handleSizeChange,
  };
}
