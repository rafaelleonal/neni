"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { haptic } from "@/lib/haptics";

import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/neni-icons";

import { StepCategory, type Category } from "./_components/step-category";
import { StepName } from "./_components/step-name";
import { StepProduct } from "./_components/step-product";
import { Stepper } from "./_components/stepper";

const TOTAL_STEPS = 3;

type Step = 1 | 2 | 3;

type OnboardingData = {
  businessName: string;
  category: Category | null;
  productName: string;
  productPrice: string;
  productPhoto: string | null;
};

const INITIAL_DATA: OnboardingData = {
  businessName: "",
  category: null,
  productName: "",
  productPrice: "",
  productPhoto: null,
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);

  const isStepValid = (() => {
    switch (step) {
      case 1:
        return data.businessName.trim().length > 0;
      case 2:
        return data.category !== null;
      case 3:
        return (
          data.productName.trim().length > 0 && Number(data.productPrice) > 0
        );
    }
  })();

  function handleNext() {
    if (!isStepValid) return;
    if (step < TOTAL_STEPS) {
      haptic("light");
      setStep((step + 1) as Step);
    } else {
      haptic("medium");
      // TODO: hit API to create the store. For now, log and route to dashboard.
      console.log("Onboarding complete:", data);
      router.push("/dashboard");
    }
  }

  function handleBack() {
    haptic("selection");
    if (step === 1) {
      router.back();
    } else {
      setStep((step - 1) as Step);
    }
  }

  return (
    <main className="bg-td-bg flex min-h-dvh flex-col lg:items-center lg:justify-center">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col lg:flex-none lg:py-10">
        <Stepper current={step} total={TOTAL_STEPS} onBack={handleBack} />

        <div className="flex-1 px-5 pt-6 pb-32 md:px-6 md:pt-10 lg:flex-none lg:pb-6">
          {step === 1 && (
            <StepName
              value={data.businessName}
              onChange={(businessName) => setData({ ...data, businessName })}
            />
          )}
          {step === 2 && (
            <StepCategory
              value={data.category}
              onChange={(category) => setData({ ...data, category })}
            />
          )}
          {step === 3 && (
            <StepProduct
              name={data.productName}
              price={data.productPrice}
              photo={data.productPhoto}
              onNameChange={(productName) => setData({ ...data, productName })}
              onPriceChange={(productPrice) =>
                setData({ ...data, productPrice })
              }
              onPhotoChange={(productPhoto) =>
                setData({ ...data, productPhoto })
              }
            />
          )}
        </div>

        <div className="bg-td-bg sticky bottom-0 px-5 pt-3 pb-6 md:px-6 lg:static lg:bg-transparent lg:pt-2 lg:pb-0">
          <Button
            full
            size="lg"
            disabled={!isStepValid}
            onClick={handleNext}
            type="button"
          >
            {step === TOTAL_STEPS ? "Crear mi tienda" : "Continuar"}
            <ArrowIcon size={16} />
          </Button>
        </div>
      </div>
    </main>
  );
}
