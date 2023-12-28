import { render, screen } from "@testing-library/react";
import { ProfileMain } from "../ProfileMain";
import { UserProfileData } from "@/models/User";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

test("Profile Main Test", () => {
  const user1 = {
    userName: "Mohamed2433",
    url: "http://www.google.com",
    name: "Mohamed Atef",
    email: "test@gmail.com",
    verified: false,
    followingCount: 20,
    followersCount: 100,
    createdAt: new Date().toISOString().toString(),
    description: "test bio",
    birthDate: new Date().toISOString().toString(),
    profileImageUrl: "testImgUrl",
    profileBannerUrl: "testBannerUrl",
    isBlocked: false,
    isFollowing: false,
    isMuted: false,
    location: "Giza, Egypt",
    tweetCount: 50,
  } as UserProfileData;

  const { container } = render(
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ProfileMain user={user1} />
      </QueryClientProvider>
    </BrowserRouter>
  );

  expect(screen.findByText("Mohamed Atef")).toBeTruthy();
  expect(screen.findByText("test@gmail.com")).toBeTruthy();
  expect(screen.findByText("Mohamed2433")).toBeTruthy();
  expect(screen.findByText("googl.com")).toBeTruthy();
  expect(screen.findByText("20 Follwing")).toBeTruthy();
  expect(screen.findByText("100 Followers")).toBeTruthy();
  expect(screen.findByText("50 Posts")).toBeTruthy();
  expect(screen.findByText("Joined")).toBeTruthy();
  expect(screen.findByText("Born")).toBeTruthy();
  expect(screen.findByText("Giza, Egypt")).toBeTruthy();
  expect(screen.findByText("Follow")).toBeTruthy();
  expect(container.querySelectorAll("svg").length).toBe(4);
});
