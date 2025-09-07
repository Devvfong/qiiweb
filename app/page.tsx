"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login");
  return null;
}
