# 모달 UI 사용법

간단하고 재사용 가능한 모달 컴포넌트들을 만들었습니다.

## 사용 가능한 모달 타입

### 1. 기본 모달 (Modal)
가장 기본적인 모달로, 자유롭게 커스터마이징 가능합니다.

```tsx
import Modal from '@/components/ui/modal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="커스텀 모달"
        size="md" // 'sm' | 'md' | 'lg' | 'xl'
        footer={
          <div className="flex gap-2 justify-end">
            <button onClick={() => setIsOpen(false)}>닫기</button>
          </div>
        }
      >
        <p>여기에 모달 내용을 넣으세요.</p>
      </Modal>
    </>
  );
}
```

### 2. 알림 모달 (AlertModal)
확인 버튼만 있는 간단한 알림 모달입니다.

```tsx
import { AlertModal } from '@/components/ui/modal';
import { useModal } from '@/contexts/ModalContext';

function MyComponent() {
  const { openAlertModal } = useModal();

  const handleClick = () => {
    openAlertModal("성공", "작업이 완료되었습니다!");
  };

  return <button onClick={handleClick}>알림 표시</button>;
}
```

### 3. 확인 모달 (ConfirmModal)
확인/취소 버튼이 있는 확인 모달입니다.

```tsx
import { useModal } from '@/contexts/ModalContext';

function MyComponent() {
  const { openConfirmModal } = useModal();

  const handleDelete = () => {
    openConfirmModal(
      "삭제 확인",
      "정말로 삭제하시겠습니까?",
      () => {
        // 확인 버튼 클릭 시 실행될 함수
        console.log("삭제되었습니다");
      }
    );
  };

  return <button onClick={handleDelete}>삭제</button>;
}
```

## 모달 속성

### Modal 컴포넌트 속성
- `isOpen`: 모달 열림/닫힘 상태
- `onClose`: 모달 닫기 함수
- `title`: 모달 제목 (선택사항)
- `size`: 모달 크기 ('sm', 'md', 'lg', 'xl')
- `showCloseButton`: X 버튼 표시 여부 (기본: true)
- `closeOnOverlayClick`: 배경 클릭 시 닫기 여부 (기본: true)
- `footer`: 모달 하단 영역 (선택사항)

### 편의 기능
- **ESC 키로 닫기**: ESC 키를 누르면 모달이 닫힙니다
- **배경 스크롤 방지**: 모달이 열려있을 때 배경 스크롤이 비활성화됩니다
- **반응형 디자인**: 모바일에서도 적절히 표시됩니다

## 설정 방법

1. **ModalProvider로 앱 감싸기** (이미 설정됨)
```tsx
// layout.tsx 또는 _app.tsx
import { ModalProvider } from '@/contexts/ModalContext';
import ModalContainer from '@/components/common/ModalContainer';

export default function Layout({ children }) {
  return (
    <ModalProvider>
      {children}
      <ModalContainer />
    </ModalProvider>
  );
}
```

2. **컴포넌트에서 사용하기**
```tsx
import { useModal } from '@/contexts/ModalContext';

function MyComponent() {
  const { openAlertModal, openConfirmModal } = useModal();
  
  // 모달 함수들 사용
}
```

이제 어디서든 간단하게 모달을 사용할 수 있습니다!
