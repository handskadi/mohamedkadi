"use client";

import Link from "next/link";
import { useState } from "react";
import { useCVStore } from "../context/useCVStore";
import StepHeader from "../components/StepHeader";

export default function PersonalDetailsPage() {
    const [showAdditional, setShowAdditional] = useState(false);
    const { personal, updatePersonal, setPersonalPhoto } = useCVStore();

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setPersonalPhoto(reader.result as string);
        reader.readAsDataURL(file);
    };

    return (
        <div className="min-h-screen bg-gray-100 mt-[80] pb-24">
            <StepHeader title="Personal Details" currentStep={1} />

            <div className="max-w-3xl mx-auto bg-white mt-[-20px] p-8 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Personal details</h2>
                    <select className="text-sm px-2 py-1 border border-gray-300 rounded">
                        <option>English</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                    <div className="sm:col-span-1 flex flex-col items-center justify-center text-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                            {personal.photo ? (
                                <img
                                    src={personal.photo}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                                    Add Photo
                                </div>
                            )}
                        </div>

                        <label className="mt-3 inline-block cursor-pointer text-indigo-600 text-sm font-medium hover:underline">
                            Upload Photo
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                        </label>
                    </div>


                    <div className="sm:col-span-2 grid sm:grid-cols-2 gap-4">
                        <input
                            name="firstName"
                            value={personal.firstName}
                            onChange={(e) => updatePersonal("firstName", e.target.value)}
                            placeholder="First name*"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                        <input
                            name="lastName"
                            value={personal.lastName}
                            onChange={(e) => updatePersonal("lastName", e.target.value)}
                            placeholder="Last name*"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                        <input
                            name="email"
                            value={personal.email}
                            onChange={(e) => updatePersonal("email", e.target.value)}
                            placeholder="Email address*"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                        <input
                            name="phone"
                            value={personal.phone}
                            onChange={(e) => updatePersonal("phone", e.target.value)}
                            placeholder="Phone number"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                        <input
                            name="zip"
                            value={personal.zip}
                            onChange={(e) => updatePersonal("zip", e.target.value)}
                            placeholder="Zip code"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                        <input
                            name="city"
                            value={personal.city}
                            onChange={(e) => updatePersonal("city", e.target.value)}
                            placeholder="City/Town"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />
                        <input
                            name="address"
                            value={personal.address}
                            onChange={(e) => updatePersonal("address", e.target.value)}
                            placeholder="Address"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:col-span-2"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={() => setShowAdditional(!showAdditional)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-sm py-2 px-4 rounded flex items-center justify-between"
                    >
                        <span>Additional information</span>
                        <span className="text-lg">{showAdditional ? "−" : "+"}</span>
                    </button>

                    {showAdditional && (
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex gap-2">
                                <input
                                    name="birthDay"
                                    value={personal.birthDay}
                                    onChange={(e) => updatePersonal("birthDay", e.target.value)}
                                    placeholder="Day"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                                <input
                                    name="birthMonth"
                                    value={personal.birthMonth}
                                    onChange={(e) => updatePersonal("birthMonth", e.target.value)}
                                    placeholder="Month"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                                <input
                                    name="birthYear"
                                    value={personal.birthYear}
                                    onChange={(e) => updatePersonal("birthYear", e.target.value)}
                                    placeholder="Year"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                            </div>
                            <input
                                name="birthPlace"
                                value={personal.birthPlace}
                                onChange={(e) => updatePersonal("birthPlace", e.target.value)}
                                placeholder="Place of birth"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <input
                                name="license"
                                value={personal.license}
                                onChange={(e) => updatePersonal("license", e.target.value)}
                                placeholder="Driving license"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <select
                                name="gender"
                                value={personal.gender}
                                onChange={(e) => updatePersonal("gender", e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                name="nationality"
                                value={personal.nationality}
                                onChange={(e) => updatePersonal("nationality", e.target.value)}
                                placeholder="Nationality"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <input
                                name="maritalStatus"
                                value={personal.maritalStatus}
                                onChange={(e) => updatePersonal("maritalStatus", e.target.value)}
                                placeholder="Marital status"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <input
                                name="linkedin"
                                value={personal.linkedin}
                                onChange={(e) => updatePersonal("linkedin", e.target.value)}
                                placeholder="LinkedIn"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <input
                                name="website"
                                value={personal.website}
                                onChange={(e) => updatePersonal("website", e.target.value)}
                                placeholder="Website"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                        </div>
                    )}
                </div>

                <div className="text-center mt-10">
                    <Link href="/tools/cv-builder/experiences">
                        <button className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 font-semibold">
                            Next step →
                        </button>
                    </Link>
                    <p className="text-xs text-gray-500 mt-4">
                        By clicking "Next step", you agree to our{" "}
                        <a href="#" className="underline">
                            terms
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline">
                            privacy policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
