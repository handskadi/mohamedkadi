import { getTrustpilot } from "@/lib/getTrustpilot";
import TrustpilotCarousel from "@/components/trustpilot/TrustpilotCarousel";
import TrustpilotCarouselV2 from "@/components/trustpilot/TrustpilotCarouselV2";
import TrustpilotStarter from "@/components/trustpilot/TrustpilotStarter";
import TrustpilotMini from "@/components/trustpilot/TrustpilotMini";



export default async function HomePage() {
    const data = await getTrustpilot();

    return (
        <>
            <div className="mx-auto max-w-6xl p-6 mt-40">
                <TrustpilotCarousel
                    rate={data.rate}
                    reviewsNum={data.reviewsNum}
                    reviews={data.reviews}
                />
            </div>
            <div className="mx-auto max-w-6xl p-6">
                <TrustpilotCarouselV2
                    rate={data.rate}
                    reviewsNum={data.reviewsNum}
                    reviews={data.reviews}
                    trustpilotUrl={data.url}
                />

            </div>
            <div className="mx-auto max-w-6xl p-6">
                <TrustpilotStarter
                    reviewsNum={data.reviewsNum}
                    rate={data.rate}
                    href={data.url ?? undefined}
                />
            </div>
            <div className="mx-auto max-w-6xl p-6">

            </div>

            <TrustpilotMini
                rate={data.rate}
                reviewsNum={data.reviewsNum}
                href={data.url ?? undefined}
            />
        </>
    );
}
