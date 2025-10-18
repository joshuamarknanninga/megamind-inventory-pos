import InventoryForm from '../components/InventoryForm';
import InventoryTable from '../components/InventoryTable';
import StorePicker from '../components/StorePicker';

export default function Inventory(){
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <StorePicker />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <InventoryForm />
        <InventoryTable />
      </div>
    </div>
  );
}
