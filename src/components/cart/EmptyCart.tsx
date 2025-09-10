import Button from "../common/Button";

export default function EmptyCart() {
    return (
        <div className="text-center py-12 space-y-4">
             <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
             <p className="mt-1 text-gray-500">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Button 
                href="/products"
                text="Continue Shopping"
                variant="primary"
                className="!w-48"
            />
        </div>
    );
}