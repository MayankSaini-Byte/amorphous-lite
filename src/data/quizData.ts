// --- MOTIF Track-Specific Quiz System ---

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
}

export interface QuizResult {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  pointsEarned: number;
}

// --- Question Bank: Data Science & Python ---
const PYTHON_QUESTIONS: QuizQuestion[] = [
  {
    id: 'py-1',
    question: 'What is the output of print(2 ** 3)?',
    options: ['6', '8', '9', 'Error'],
    correctIndex: 1,
    explanation: '2 ** 3 calculates 2 raised to the power of 3 = 8.',
    points: 10,
  },
  {
    id: 'py-2',
    question: 'Which data structure in Python is mutable and ordered?',
    options: ['Tuple', 'Set', 'List', 'String'],
    correctIndex: 2,
    explanation: 'Lists are ordered collections that can be modified in-place.',
    points: 10,
  },
  {
    id: 'py-3',
    question: 'In NumPy, what attribute returns the dimensions of an array?',
    options: ['arr.size', 'arr.shape', 'arr.ndim', 'arr.length'],
    correctIndex: 1,
    explanation: 'arr.shape returns a tuple representing array dimensions (rows, cols).',
    points: 10,
  },
  {
    id: 'py-4',
    question: 'What is the output of print(type(1 / 2)) in Python 3?',
    options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "Error"],
    correctIndex: 1,
    explanation: 'True division (/) in Python 3 always returns a float.',
    points: 10,
  },
  {
    id: 'py-5',
    question: 'Which Pandas method is used to remove missing/NaN values from a DataFrame?',
    options: ['df.fillna()', 'df.dropna()', 'df.remove_nan()', 'df.clean()'],
    correctIndex: 1,
    explanation: 'df.dropna() drops rows or columns containing missing values.',
    points: 10,
  },
  {
    id: 'py-6',
    question: 'What does the method list.append(x) do?',
    options: ['Adds x at index 0', 'Adds x at the end of the list', 'Creates a new list', 'Replaces x'],
    correctIndex: 1,
    explanation: 'append() modifies the existing list by adding x to the end.',
    points: 10,
  }
];

// --- Question Bank: Machine Learning ---
const ML_QUESTIONS: QuizQuestion[] = [
  {
    id: 'ml-1',
    question: 'What issue occurs when a model performs extremely well on training data but poorly on test data?',
    options: ['Underfitting', 'Overfitting', 'High Bias', 'Vanishing Gradient'],
    correctIndex: 1,
    explanation: 'Overfitting occurs when a model learns noise in the training set and fails to generalize.',
    points: 10,
  },
  {
    id: 'ml-2',
    question: 'Which evaluation metric is defined as True Positives / (True Positives + False Positives)?',
    options: ['Recall', 'Accuracy', 'Precision', 'F1-Score'],
    correctIndex: 2,
    explanation: 'Precision measures out of all positive predictions, how many were actually correct.',
    points: 10,
  },
  {
    id: 'ml-3',
    question: 'Which learning paradigm relies on unlabeled data to discover hidden patterns?',
    options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Semi-supervised Learning'],
    correctIndex: 1,
    explanation: 'Unsupervised algorithms (like K-Means, PCA) cluster and analyze unlabeled datasets.',
    points: 10,
  },
  {
    id: 'ml-4',
    question: 'What is the purpose of Gradient Descent in Machine Learning?',
    options: [
      'To increase model capacity',
      'To minimize the loss/cost function by updating weights',
      'To normalize input features',
      'To split data into training and test sets'
    ],
    correctIndex: 1,
    explanation: 'Gradient descent iteratively steps in the direction of steepest loss reduction.',
    points: 10,
  },
  {
    id: 'ml-5',
    question: 'What technique combines predictions from multiple decision trees to improve accuracy?',
    options: ['K-Nearest Neighbors', 'Random Forest', 'Linear Regression', 'Naïve Bayes'],
    correctIndex: 1,
    explanation: 'Random Forest is an ensemble of decision trees trained on random bootstrap samples.',
    points: 10,
  },
  {
    id: 'ml-6',
    question: 'What does the Confusion Matrix measure in classification tasks?',
    options: [
      'Model training time',
      'True Positives, False Positives, True Negatives, & False Negatives',
      'Polynomial regression degree',
      'Neural network depth'
    ],
    correctIndex: 1,
    explanation: 'A confusion matrix breaks down actual vs predicted classifications.',
    points: 10,
  }
];

// --- Question Bank: Computer Vision ---
const CV_QUESTIONS: QuizQuestion[] = [
  {
    id: 'cv-1',
    question: 'What is the default color channel order when loading images with OpenCV (cv2.imread)?',
    options: ['RGB', 'BGR', 'HSV', 'CMYK'],
    correctIndex: 1,
    explanation: 'OpenCV loads images in BGR (Blue-Green-Red) format by default rather than RGB.',
    points: 10,
  },
  {
    id: 'cv-2',
    question: 'In Convolutional Neural Networks (CNNs), what operation reduces spatial dimensions while retaining features?',
    options: ['Convolution', 'Max Pooling', 'Softmax Activation', 'Batch Normalization'],
    correctIndex: 1,
    explanation: 'Pooling layers (e.g. Max Pooling) downsample feature maps, reducing dimensions & computation.',
    points: 10,
  },
  {
    id: 'cv-3',
    question: 'Which popular algorithm is used for edge detection by computing intensity gradients?',
    options: ['Canny Edge Detector', 'K-Means Clustering', 'ResNet Bottleneck', 'YOLO Object Detector'],
    correctIndex: 0,
    explanation: 'The Canny algorithm uses image gradients and non-maximum suppression to extract clean edges.',
    points: 10,
  },
  {
    id: 'cv-4',
    question: 'What is a 2D matrix used in image filtering to blur, sharpen, or detect features called?',
    options: ['Tensor', 'Kernel / Filter', 'Latent Vector', 'Bounding Box'],
    correctIndex: 1,
    explanation: 'A kernel matrix slides (convolves) over pixel windows to perform spatial transformations.',
    points: 10,
  },
  {
    id: 'cv-5',
    question: 'What activation function is defined as f(x) = max(0, x) in deep learning computer vision models?',
    options: ['Sigmoid', 'Tanh', 'ReLU (Rectified Linear Unit)', 'Softmax'],
    correctIndex: 2,
    explanation: 'ReLU outputs 0 for negative inputs and passes positive values unchanged, preventing vanishing gradients.',
    points: 10,
  },
  {
    id: 'cv-6',
    question: 'What does IOUs (Intersection over Union) evaluate in object detection?',
    options: ['Image blur level', 'Overlap between predicted and ground-truth bounding boxes', 'Camera resolution', 'Frame rate'],
    correctIndex: 1,
    explanation: 'IoU quantifies how closely a predicted bounding box aligns with the true target location.',
    points: 10,
  }
];

// --- Question Bank: Advanced Computation / Materials Science ---
const MAT_QUESTIONS: QuizQuestion[] = [
  {
    id: 'mat-1',
    question: 'Which quantum mechanical method approximates electron density to simulate material electronic structures?',
    options: ['Molecular Mechanics', 'Density Functional Theory (DFT)', 'Monte Carlo Tree Search', 'Finite Element Analysis'],
    correctIndex: 1,
    explanation: 'DFT solves the Kohn-Sham equations using electron density instead of full multi-electron wavefunctions.',
    points: 10,
  },
  {
    id: 'mat-2',
    question: 'In Molecular Dynamics (MD) simulations, which ensemble holds Temperature, Volume, and Particle Count constant?',
    options: ['NVE Ensemble', 'NVT (Canonical) Ensemble', 'NPT (Isothermal-Isobaric) Ensemble', 'Grand Canonical Ensemble'],
    correctIndex: 1,
    explanation: 'The NVT (Canonical) ensemble maintains fixed N (Number of particles), V (Volume), and T (Temperature).',
    points: 10,
  },
  {
    id: 'mat-3',
    question: 'What crystal structure exhibits Face-Centered Cubic packing with 4 atoms per unit cell?',
    options: ['BCC (Body-Centered Cubic)', 'FCC (Face-Centered Cubic)', 'HCP (Hexagonal Close-Packed)', 'SC (Simple Cubic)'],
    correctIndex: 1,
    explanation: 'FCC structures (like Copper, Aluminum, Gold) contain 4 net atoms per unit cell with 74% atomic packing factor.',
    points: 10,
  },
  {
    id: 'mat-4',
    question: 'What mathematical technique eliminates surface/edge boundary effects in finite atomistic simulations?',
    options: ['Periodic Boundary Conditions (PBC)', 'Fast Fourier Transform', 'Singular Value Decomposition', 'Gram-Schmidt Orthogonalization'],
    correctIndex: 0,
    explanation: 'PBC repeats the simulation cell infinitely in 3D space to simulate infinite bulk materials.',
    points: 10,
  },
  {
    id: 'mat-5',
    question: 'Which integration algorithm is widely used in MD to solve Newton equations of motion for atomic positions?',
    options: ['Runge-Kutta 4th Order', 'Verlet / Velocity Verlet Integration', 'Euler Explicit Method', 'Levenberg-Marquardt'],
    correctIndex: 1,
    explanation: 'Velocity Verlet algorithm provides time-reversible, energy-conserving numerical integration in MD.',
    points: 10,
  },
  {
    id: 'mat-6',
    question: 'What law states that Bragg diffraction occurs when n λ = 2d sin(θ) for crystal lattice planes?',
    options: ['Hooke Law', 'Bragg Law', 'Fick Law of Diffusion', 'Beer-Lambert Law'],
    correctIndex: 1,
    explanation: 'Bragg Law relates X-ray wavelength λ and incident angle θ to interplanar spacing d in crystal lattices.',
    points: 10,
  }
];

/**
 * Get track-specific quiz question for a given checkpoint index (0-indexed).
 * Cycles through the track specific question bank.
 */
export function getQuizForCheckpoint(trackId: string, quizNumber: number): QuizQuestion {
  let bank = PYTHON_QUESTIONS;

  if (trackId.includes('ml') || trackId.includes('electronics')) {
    bank = ML_QUESTIONS;
  } else if (trackId.includes('cv') || trackId.includes('vision')) {
    bank = CV_QUESTIONS;
  } else if (trackId.includes('materials') || trackId.includes('computation') || trackId.includes('advanced')) {
    bank = MAT_QUESTIONS;
  }

  const idx = quizNumber % bank.length;
  return bank[idx];
}

/**
 * Calculate total quiz score from results.
 */
export function calculateTotalScore(results: QuizResult[]): number {
  return results.reduce((sum, r) => sum + r.pointsEarned, 0);
}
