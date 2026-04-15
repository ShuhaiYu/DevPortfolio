import PageCurtain from "@/components/effects/PageCurtain";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageCurtain>{children}</PageCurtain>;
}
