import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import AnimatedRoutes from "./components/AnimatedRoutes"; // ← zidha hna

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}