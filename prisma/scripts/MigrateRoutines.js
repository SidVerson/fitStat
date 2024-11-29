"use strict";
// Run with
// npx ts-node --compiler-options '{"module":"commonjs"}' prisma/scripts/MigrateRoutines.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var predefinedWorkouts_1 = require("./predefinedWorkouts");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var predefinedNames, _i, predefinedWorkouts_2, plan, existingPlan, workoutPlanExercisesData, systemWorkoutPlans, _a, systemWorkoutPlans_1, plan;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predefinedNames = predefinedWorkouts_1.predefinedWorkouts.map(function (plan) { return plan.name; });
                    _i = 0, predefinedWorkouts_2 = predefinedWorkouts_1.predefinedWorkouts;
                    _b.label = 1;
                case 1:
                    if (!(_i < predefinedWorkouts_2.length)) return [3 /*break*/, 6];
                    plan = predefinedWorkouts_2[_i];
                    return [4 /*yield*/, prisma.workoutPlan.findFirst({
                            where: {
                                name: plan.name,
                                isSystemRoutine: true,
                            },
                        })];
                case 2:
                    existingPlan = _b.sent();
                    if (!!existingPlan) return [3 /*break*/, 4];
                    workoutPlanExercisesData = plan.WorkoutPlanExercises.map(function (exercise) {
                        var _a, _b;
                        var baseData = {
                            sets: exercise.sets,
                            order: exercise.order,
                            trackingType: exercise.trackingType,
                            Exercise: {
                                connect: { id: exercise.exerciseId },
                            },
                        };
                        return exercise.trackingType === "reps"
                            ? __assign(__assign({}, baseData), { reps: (_a = exercise.reps) !== null && _a !== void 0 ? _a : null, exerciseDuration: null }) : __assign(__assign({}, baseData), { reps: null, exerciseDuration: (_b = exercise.duration) !== null && _b !== void 0 ? _b : null });
                    });
                    return [4 /*yield*/, prisma.workoutPlan.create({
                            data: {
                                name: plan.name,
                                notes: plan.notes,
                                isSystemRoutine: true,
                                systemRoutineCategory: plan.systemRoutineCategory,
                                WorkoutPlanExercise: {
                                    create: workoutPlanExercisesData,
                                },
                            },
                        })];
                case 3:
                    _b.sent();
                    console.log("Inserted workout plan: ".concat(plan.name));
                    return [3 /*break*/, 5];
                case 4:
                    console.log("Workout plan already exists: ".concat(plan.name));
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [4 /*yield*/, prisma.workoutPlan.findMany({
                        where: {
                            isSystemRoutine: true,
                        },
                    })];
                case 7:
                    systemWorkoutPlans = _b.sent();
                    _a = 0, systemWorkoutPlans_1 = systemWorkoutPlans;
                    _b.label = 8;
                case 8:
                    if (!(_a < systemWorkoutPlans_1.length)) return [3 /*break*/, 11];
                    plan = systemWorkoutPlans_1[_a];
                    if (!!predefinedNames.includes(plan.name)) return [3 /*break*/, 10];
                    return [4 /*yield*/, prisma.workoutPlan.delete({
                            where: {
                                id: plan.id,
                            },
                        })];
                case 9:
                    _b.sent();
                    console.log("Deleted workout plan not in predefined list: ".concat(plan.name));
                    _b.label = 10;
                case 10:
                    _a++;
                    return [3 /*break*/, 8];
                case 11: return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
