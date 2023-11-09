import { useMutation, useQuery } from "@tanstack/react-query";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../ui/button";
import {
  sendSignUpVerificationEmail,
  verifyResetPasswordEmail,
  verifySignUpEmail,
} from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  PasswordChangeEmailVerificationTokenSchema,
  SignUpEmailVerificationTokenSchema,
} from "../../models/EmailVerification";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type EmailVerificationProps = {
  email: string;
  onSuccess: () => void;
  onFail?: () => void;
  verificationType?: "passwordReset" | "signUp";
};

const EmailVerification = ({
  email,
  onSuccess,
  onFail,
  verificationType = "signUp",
}: EmailVerificationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ token: string }>({
    resolver: zodResolver(
      verificationType === "signUp"
        ? z.object({ token: SignUpEmailVerificationTokenSchema })
        : z.object({ token: PasswordChangeEmailVerificationTokenSchema })
    ),
  });

  // Sending Verification Email
  const {
    isError: hasFailedToSend,
    refetch: retrySendingVerificationEmail,
    isPending: isSendingEmail,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["emailVerification"],
    queryFn: async () => sendSignUpVerificationEmail(email),
    staleTime: 0,
    retry: 0,
    retryDelay: 2000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: verificationType === "signUp",
  });

  const {
    mutate: verifyEmailWithToken,
    failureReason: verificationFailureReason,
    isPending: isVerifying,
  } = useMutation({
    mutationFn: async (token: string) => {
      if (verificationType === "passwordReset") {
        return verifyResetPasswordEmail(token);
      }
      return verifySignUpEmail(email, token);
    },
    onSuccess: onSuccess,
  });

  const onSubmit = handleSubmit((data) => {
    verifyEmailWithToken(data.token);
  });

  // States for timing out resending email
  const [resendingDisableTime, setResendingDisableTime] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // Start timer when refetching
  useEffect(() => {
    if (timerId) return;
    if (
      (isRefetching && verificationType === "signUp") ||
      (isFetching && verificationType === "passwordReset")
    ) {
      setResendingDisableTime(60);
      setTimerId(
        setInterval(() => {
          setResendingDisableTime((prev: number) => prev - 1);
        }, 1000)
      );
    }
  }, [isRefetching, isFetching]);

  // Clear timer when time is up
  useEffect(() => {
    if (resendingDisableTime === 0) {
      clearInterval(timerId!);
      setTimerId(null);
    }
  }, [resendingDisableTime]);

  // Rendering error message if failed to send email
  if (z.string().email().safeParse(email).success === false)
    return (
      <>
        <h2 className="text-3xl font-bold self-start mt-4 mb-0.5 text-danger">
          Invalid Email
        </h2>
        <h4 className="self-start text-gray text-sm">Please try again</h4>
        <Button
          variant="outline"
          size="full"
          className="mt-auto mb-2"
          onClick={onFail}
        >
          Back
        </Button>
      </>
    );

  // Rendering Skeleton while sending email
  if (verificationType === "signUp" && isSendingEmail) {
    return (
      <>
        <Skeleton className="w-full h-[170px]" data-testid="skeleton" />
        <Skeleton
          className="w-full h-[50px] mt-auto mb-2"
          data-testid="skeleton"
        />
      </>
    );
  }

  // Rendering error message if failed to send email
  if (hasFailedToSend)
    return (
      <>
        <h2 className="text-3xl font-bold self-start mt-4 mb-0.5">
          We couldn't send you a code
        </h2>
        <h4 className="self-start text-gray text-sm">Please try again later</h4>
        <Button
          variant="outline"
          size="full"
          className="mt-auto mb-2 text-danger"
          onClick={() => retrySendingVerificationEmail()}
        >
          Retry
        </Button>
      </>
    );

  return (
    <form className="w-full flex flex-col h-full" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold self-start mt-4 mb-0.5">
        We sent you a code
      </h2>
      <h4 className="self-start text-gray text-sm">
        Enter the code sent to {email} below to verify
      </h4>
      <TextInput
        placeHolder="Verification Code"
        className="mt-6"
        {...register("token")}
        errorMessage={
          errors.token?.message || verificationFailureReason?.message
        }
      />
      {resendingDisableTime > 0 ? (
        <p className="text-sm text-gray self-start">
          Resend code in ({resendingDisableTime}) seconds
        </p>
      ) : (
        <p
          className="text-sm text-secondary cursor-pointer self-start"
          onClick={() => retrySendingVerificationEmail()}
        >
          Didn't receive email? resend it
        </p>
      )}
      <Button
        variant="outline"
        size="full"
        className="mt-auto mb-2"
        type="submit"
        disabled={!isValid || isVerifying}
      >
        Next
      </Button>
    </form>
  );
};
export default EmailVerification;
