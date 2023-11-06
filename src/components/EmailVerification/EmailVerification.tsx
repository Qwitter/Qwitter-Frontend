import { useMutation, useQuery } from "@tanstack/react-query";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../ui/button";
import { sendVerificationEmail, verifyEmail } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";

type EmailVerificationProps = {
  email: string;
};

const EmailVerification = ({ email }: EmailVerificationProps) => {
  // Sending Verification Email
  const {
    isPending: isSendingEmail,
    isError: hasFailedToSend,
    refetch: retrySendingVerificationEmail,
    isRefetching,
  } = useQuery({
    queryKey: ["emailVerification"],
    queryFn: async () => sendVerificationEmail(email),
    staleTime: 0,
    retry: 2,
    retryDelay: 2000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const {mutate: verifyEmailWithToken} = useMutation({
    mutationKey: ["emailVerification"],
    mutationFn: async () => verifyEmail("123456"),
  })

  // States for timing out resending email
  const [resendingDisableTime, setResendingDisableTime] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // Start timer when refetching
  useEffect(() => {
    if (timerId) return;
    if (isRefetching) {
      setResendingDisableTime(60);
      setTimerId(
        setInterval(() => {
          setResendingDisableTime((prev: number) => prev - 1);
        }, 1000)
      );
    }
  }, [isRefetching]);

  // Clear timer when time is up
  useEffect(() => {
    if (resendingDisableTime === 0) {
      clearInterval(timerId!);
      setTimerId(null);
    }
  }, [resendingDisableTime]);

  // Rendering Skeleton while sending email
  if (isSendingEmail) {
    return (
      <>
        <Skeleton className="w-full h-[170px]" />
        <Skeleton className="w-full h-[50px] mt-auto mb-16" />
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
          className="mt-auto mb-16 text-danger"
          onClick={() => retrySendingVerificationEmail()}
        >
          Retry
        </Button>
      </>
    );

  return (
    <>
      <h2 className="text-3xl font-bold self-start mt-4 mb-0.5">
        We sent you a code
      </h2>
      <h4 className="self-start text-gray text-sm">
        Enter the code sent to {email} below to verify
      </h4>
      <TextInput placeHolder="Verification Code" className="mt-6"/>
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
        onClick={() => verifyEmailWithToken()}
      >
        Next
      </Button>
    </>
  );
};
export default EmailVerification;
