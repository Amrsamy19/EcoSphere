import ProductDetailsCard from "@/components/layout/Store/product details/ProductDetailsCard";
import ProductHero from "@/components/layout/Store/product details/ProductHero";
import TextComponent from "@/components/layout/Store/product details/TextComponent";
import { products } from "@/components/layout/Store/ProductCardSection";

interface Props {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  const { productId } = await params;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductHero product={product} />
      <div className="w-[80%] mx-auto">
        <ProductDetailsCard product={product} />
        <TextComponent product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
