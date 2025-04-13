import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../src/firebase";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: true,
      error: null,

      // Initialize Firebase auth listener
      initializeAuthUser: () => {
        set({ loading: true });

        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            set({ user, loading: false });
          } else {
            set({ user: null, loading: false });
          }
        });

        return unsubscribe;
      },

      // Create user with email and password
      signUp: async (email, password) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          set({ user: userCredential.user, loading: false, error: null });
        } catch (error) {
          if (error instanceof Error) {
            set({ error: error.message, loading: false });
          } else {
            set({ error: "An unknown error occurred", loading: false });
          }
          throw error;
        }
      },

      // Sign in with email and password
      signIn: async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          set({ user: userCredential.user, loading: false, error: null });
        } catch (error) {
          if (error instanceof Error) {
            set({ error: error.message, loading: false });
          } else {
            set({ error: "An unknown error occurred", loading: false });
          }
          throw error;
        }
      },

      // Sign out
      signOut: async () => {
        try {
          await signOut(auth);
          set({ user: null, loading: false, error: null });
        } catch (error) {
          if (error instanceof Error) {
            set({ error: error.message, loading: false });
          } else {
            set({ error: "An unknown error occurred", loading: false });
          }
        }
      },
    }),
    {
      name: "auth-storage", // Name of the localStorage key
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useAuthStore;
