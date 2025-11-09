import { create } from 'zustand';

type LongPress = {
  visible: boolean;
  selectedNotes: number[];
  handleLongPress: (id: number) => void;
  toggleSelection: (id: number) => void;
  handleClose: () => void;
};

export const useLongPressStore = create<LongPress>((set) => ({
  visible: false, //Estado de si la options bar es visible o no.
  selectedNotes: [], //Guardo el id de las notas seleccionadas.

  handleLongPress: (id: number) => set({ visible: true, selectedNotes: [id] }), //Marca la nota seleccionada con el longpress
  toggleSelection: (id: number) =>
    set((state) => {
      const isSelected = state.selectedNotes.includes(id);
      const newSelected = isSelected
        ? state.selectedNotes.filter((n) => n !== id)
        : [...state.selectedNotes, id];

      return {
        selectedNotes: newSelected,
        visible: newSelected.length > 0,
      };
    }), //Marca o desmarca las notas cuando la optionsbar es visible.
  handleClose: () => set({ visible: false, selectedNotes: [] }), //Desaparece la options bar.
}));
