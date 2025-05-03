import CurveFittingLab from "@/components/curve-fitting-lab"
import RichContentSection from "@/components/rich-content-section"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-sky-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Curve Fitting Lab</h1>
      <div className="w-full max-w-6xl mx-auto">
        <CurveFittingLab />
        <RichContentSection />
      </div>
    </main>
  )
}
