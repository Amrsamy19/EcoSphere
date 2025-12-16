import ProductDetailsCard from "@/components/layout/Store/productDetails/ProductDetailsCard";
import ProductHero from "@/components/layout/Store/productDetails/ProductHero";
import RelatedProducts from "@/components/layout/Store/productDetails/RelatedProducts";
import TextComponent from "@/components/layout/Store/productDetails/TextComponent";

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

const ProductPage = async ({ params }: Props) => {
  const { productId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
    cache: 'no-store',
  });
  const product = await res.json();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="overflow-x-hidden">
      <ProductHero product={product} />
      <div className="w-[80%] mx-auto">
        <ProductDetailsCard product={product} />
        <TextComponent product={product} />
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductPage;
