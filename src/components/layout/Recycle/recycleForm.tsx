"use client";

import React, { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  recycleFormSchema,
  type RecycleFormValues,
} from "@/frontend/schema/recycle.schema";
import PersonalInfoSection from "./personalInfoSection";
import AddressSection from "./addressSection";
import MaterialSection from "./MaterialSection";
import { FaRecycle } from "react-icons/fa6";

type MaterialItem = {
  id: number;
  type: string;
  amount: number;
};

const RecycleForm = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>([
    { id: 1, type: "", amount: 1 },
  ]);
  const [isPending] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isHFSubmitting },
    reset,
  } = useForm<RecycleFormValues>({
    resolver: zodResolver(recycleFormSchema),
  });

  const addMaterial = () =>
    setMaterials([...materials, { id: Date.now(), type: "", amount: 1 }]);

  const removeMaterial = (id: number) =>
    materials.length > 1 && setMaterials(materials.filter((m) => m.id !== id));

  const updateAmount = (index: number, delta: number) => {
    const updated = [...materials];
    updated[index].amount = Math.max(1, updated[index].amount + delta);
    setMaterials(updated);
  };

  const handleNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
  };

  const onSubmit: SubmitHandler<RecycleFormValues> = async (data) => {
    await new Promise((res) => setTimeout(res, 1500));
    console.log({ ...data, materials });
    reset();
    setMaterials([{ id: 1, type: "", amount: 1 }]);
  };

  const isSubmitting = isPending || isHFSubmitting;

  return (
    <div className="w-full min-h-screen  text-foreground flex flex-col items-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[80%] max-w-7xl mx-auto"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-12   p-8 md:p-16 rounded-[3rem] border-2  border-primary/80 shadow-2xl"
        >
          <div className="text-center space-y-4 animate-bounce">
            <h2 className="text-5xl font-extrabold text-primary">
              Recycle Request
            </h2>
            <p className="text-primary/80">
              Schedule your pickup. Eco-friendly and easy.
            </p>
          </div>

          <PersonalInfoSection
            register={register}
            errors={errors}
            handleNumberInput={handleNumberInput}
          />

          <AddressSection register={register} errors={errors} />

          <MaterialSection
            materials={materials}
            removeMaterial={removeMaterial}
            updateAmount={updateAmount}
            register={register}
            addMaterial={addMaterial}
            errors={errors}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full myBtnPrimary"
          >
            <FaRecycle size={20} />

            {isSubmitting ? "Processing..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RecycleForm;
