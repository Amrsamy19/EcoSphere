"use client";

import { motion } from "framer-motion";
import ProductSliderSection from "./ProductSliderSection";
import { useTranslations } from 'next-intl';

const RelatedProducts = () => {
  const t = useTranslations('ProductDetails.related');
  return (
    <section className="mt-20 overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
        className="mb-10"
      >
        <div className="mb-10">
          <h2 className="text-2xl text-center font-semibold text-foreground">
            {t('title')}
          </h2>
          <p className="text-sm text-center text-secondary-foreground">
            {t('subtitle')}
          </p>
        </div>
        <ProductSliderSection />
      </motion.div>
    </section>
  );
};

export default RelatedProducts;