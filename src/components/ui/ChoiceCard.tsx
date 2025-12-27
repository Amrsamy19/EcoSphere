import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type PaymentMethod = "Credit card" | "Cash on delivery";

export function FieldChoiceCard({
  setPaymentMethod,
}: {
  setPaymentMethod: (method: PaymentMethod) => void;
}) {
  return (
    <div className="w-full max-w-md mt-3">
      <FieldGroup>
        <FieldSet>
          <FieldLabel htmlFor="Select payment method">
            Select payment method
          </FieldLabel>
          <RadioGroup
            defaultValue="Credit card"
            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
          >
            <FieldLabel htmlFor="Credit card">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Credit card</FieldTitle>
                  <FieldDescription>pay the items only</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="Credit card" id="Credit card" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="Cash on delivery">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Cash on delivery</FieldTitle>
                  <FieldDescription>pay 30 EGP more</FieldDescription>
                </FieldContent>
                <RadioGroupItem
                  value="Cash on delivery"
                  id="Cash on delivery"
                />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
}
