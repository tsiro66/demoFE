import { useCart } from '../hook/useCart';
import { ProductDisplay } from '../components/ProductDisplay';
import { IoCheckmarkSharp } from "react-icons/io5";

const LandingPage = () => {
    const { product, isLoading, error } = useCart();

    // 1. Handle Loading State
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p className="text-xl font-medium text-gray-700">Loading Product...</p>
            </div>
        );
    }

    // 2. Handle Error State
    if (error) {
        return (
            <div className="container mx-auto px-6 py-12">
                <div className="p-8 bg-red-100 text-red-700 shadow-lg rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Connection Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    // 3. Handle case where product is null (Fixes linter error)
    if (!product) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p className="text-xl font-medium text-gray-500">Product data is unavailable.</p>
            </div>
        );
    }

    // 4. Handle Success State
    return (
        <>
            
            {/* --- 1. Main Product Section --- */}
            <div className="container mx-auto px-6 py-16 lg:py-24" id="product">
                <ProductDisplay />
            </div>

            {/* --- 2. Features/Benefits Section --- */}
            <div className="py-24">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
                        Everything You Need. Nothing You Don't.
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="flex space-x-4 items-center">
                            <div className="shrink-0 text-indigo-600"><IoCheckmarkSharp /></div>
                            <div>
                                <h3 className="text-lg font-semibold">Seamless Integration</h3>
                                <p className="text-gray-600">Connects to all your devices in seconds.</p>
                            </div>
                        </div>
                        {/* Feature 2 */}
                        <div className="flex space-x-4 items-center">
                            <div className="shrink-0 text-indigo-600"><IoCheckmarkSharp /></div>
                            <div>
                                <h3 className="text-lg font-semibold">All-Day Battery</h3>
                                <p className="text-gray-600">A single charge lasts over 48 hours.</p>
                            </div>
                        </div>
                        {/* Feature 3 */}
                        <div className="flex space-x-4 items-center">
                            <div className="shrink-0 text-indigo-600"><IoCheckmarkSharp /></div>
                            <div>
                                <h3 className="text-lg font-semibold">Award-Winning Design</h3>
                                <p className="text-gray-600">Built with premium, lightweight materials.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 4. Social Proof / Testimonial Section --- */}
            <div className="bg-gray-50 py-24">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <p className="text-2xl font-semibold text-gray-900">
                        "This is the piece of tech I've been waiting for. It completely
                        changed my workflow. I can't recommend it enough."
                    </p>
                    <p className="mt-4 text-lg font-medium text-gray-600">
                        - Alex Demo, CEO at TechMark Solutions
                    </p>
                </div>
            </div>
        </>
    );
};

export default LandingPage;